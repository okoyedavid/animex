import { User } from "@/types/user";
import { backend } from "./axios";

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

type RegisterUserResponse = Promise<{
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

    console.log(response.data);
    return { data: user, success: true, message };
  } catch (error) {
    console.error(error);

    return { data: null, success: false, message: error.message };
  }
}

export { loginUser, getUser, registerUser };
