import { User } from "@/types/user";
import { backend } from "./axios";
import { Providers } from "@/app/dashboard/settings/account";

type LoginProps = {
  email: string;
  password: string;
};
type RegisterProps = {
  email: string;
  password: string;
  name: string;
};

type LoginUserResponse = Promise<{
  data: User | null;
  message: string;
  success: boolean;
}>;

type GetProvidersResponse = Promise<{
  data: Providers;
  success: boolean;
}>;

type RegisterUserResponse = Promise<{
  data: User | null;
  message: string;
  success: boolean;
}>;

type VerifyEmailResponse = Promise<{
  data: User | null;
  message: string;
  success: boolean;
}>;

type ChangeEmailResponse = Promise<{
  data: User | null;
  message: string;
  success: boolean;
}>;

type DeleteProviderResponse = Promise<{
  data: User | null;
  message: string;
  success: boolean;
}>;

async function loginUser({ email, password }: LoginProps): LoginUserResponse {
  try {
    const response = await backend.post("/auth/login", {
      email,
      password,
    });

    const { user, message } = response.data;

    return {
      data: user,
      success: true,
      message,
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      success: false,
      message: err.message,
    };
  }
}

async function registerUser({
  email,
  password,
  name,
}: RegisterProps): RegisterUserResponse {
  try {
    const response = await backend.post("/auth/register", {
      email,
      name,
      password,
    });

    const { user, message } = response.data;

    return {
      data: user,
      success: true,
      message,
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      success: false,
      message: err.message,
    };
  }
}

async function getUser(): LoginUserResponse {
  try {
    const response = await backend.get("/auth/me");

    const { user, message } = response.data;

    return { data: user, success: true, message };
  } catch (error) {
    console.error(error);

    return { data: null, success: false, message: error.message };
  }
}

async function verifyEmail({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): VerifyEmailResponse {
  try {
    const response = await backend.post("/auth/verify-email", {
      email,
      otp,
    });

    const { user, message } = response.data;

    return {
      data: user,
      success: true,
      message,
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      success: false,
      message: err.message,
    };
  }
}

async function resendVerificationEmail(email: string): VerifyEmailResponse {
  try {
    const response = await backend.post("/auth/resend-email", {
      email,
    });
    const { user } = response.data;
    return {
      data: user,
      success: true,
      message: "Email resent successfully!",
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      success: false,
      message: err.message,
    };
  }
}
function loginWithGoogle() {
  window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
}

function loginWithGithub() {
  window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github`;
}

async function sendChangeEmailOtp({
  newEmail,
}: {
  newEmail: string;
}): ChangeEmailResponse {
  try {
    const response = await backend.post("/auth/change-email", {
      newEmail,
    });
    const { user, message } = response.data;

    return {
      data: user ?? null,
      success: true,
      message,
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      success: false,
      message: err.message,
    };
  }
}

async function confirmChangeEmail({
  otp,
}: {
  otp: string;
}): ChangeEmailResponse {
  try {
    const response = await backend.patch("/auth/change-email", {
      otp,
    });
    const { user, message } = response.data;

    return {
      data: user ?? null,
      success: true,
      message,
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      success: false,
      message: err.message,
    };
  }
}

async function getProviders(): GetProvidersResponse {
  try {
    const response = await backend.get("/auth/me/providers");
    const { data } = response.data;

    return {
      data,
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      data: null,
      success: false,
    };
  }
}

async function deleteProvider({
  provider,
}: {
  provider: string;
}): DeleteProviderResponse {
  try {
    const response = await backend.delete(
      `/auth/disconnect-provider/${provider}`,
    );
    const { message } = response.data;

    return {
      data: null,
      success: true,
      message,
    };
  } catch (err) {
    console.log(err);
    console.error(err);

    return {
      data: null,
      success: false,
      message: err.message,
    };
  }
}

export const resetPassword = async ({
  password,
  newPassword,
}: {
  password: string;
  newPassword: string;
}) => {
  const { data } = await backend.post("/auth/reset-password", {
    password,
    newPassword,
  });

  return data;
};

export {
  loginUser,
  getUser,
  loginWithGithub,
  registerUser,
  verifyEmail,
  resendVerificationEmail,
  loginWithGoogle,
  getProviders,
  sendChangeEmailOtp,
  confirmChangeEmail,
  deleteProvider,
};
