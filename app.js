async function ensureAnonymousSession() {
  const {
    data: sessionData,
    error: sessionError
  } = await supabaseClient.auth.getSession();

  if (sessionError) {
    console.error("Erro ao verificar sessão:", sessionError);
    throw new Error("Não foi possível verificar a sessão.");
  }

  if (sessionData?.session?.user) {
    return sessionData.session;
  }

  const {
    data: anonymousData,
    error: anonymousError
  } = await supabaseClient.auth.signInAnonymously();

  if (anonymousError) {
    console.error(
      "Erro ao iniciar autenticação anônima:",
      anonymousError
    );

    throw new Error(
      "Não foi possível iniciar a sessão. Verifique se o login anônimo está ativado no Supabase."
    );
  }

  if (!anonymousData?.session) {
    throw new Error("A sessão anônima não foi criada.");
  }

  return anonymousData.session;
}


async function facilitatorLogin(roomCode, pin) {
  const normalizedRoomCode = String(roomCode ?? "")
    .trim()
    .toUpperCase();

  const normalizedPin = String(pin ?? "").trim();

  if (!normalizedRoomCode) {
    throw new Error("Informe o código da sala.");
  }

  if (!normalizedPin) {
    throw new Error("Informe a senha do facilitador.");
  }

  // Cria ou recupera uma sessão Supabase válida
  const authSession = await ensureAnonymousSession();

  const { data, error } = await supabaseClient.rpc(
    "risklab_facilitator_login",
    {
      p_room_code: normalizedRoomCode,
      p_pin: normalizedPin
    }
  );

  if (error) {
    console.error("Erro na função de login:", error);
    throw new Error(
      error.message || "Não foi possível realizar o login."
    );
  }

  if (!data?.ok) {
    throw new Error(
      data?.message || "Código ou senha inválidos."
    );
  }

  const facilitatorSession = {
    room_id: data.room_id,
    room_code: data.room_code,
    room_title:
      data.room_title ||
      data.room_name ||
      "Sala RiskLab",

    user_id: authSession.user.id,

    created_at: new Date().toISOString(),

    // Sessão local válida por 12 horas
    expires_at: Date.now() + 12 * 60 * 60 * 1000
  };

  localStorage.setItem(
    "risklab_facilitator_session",
    JSON.stringify(facilitatorSession)
  );

  return facilitatorSession;
}
