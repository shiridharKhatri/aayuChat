let host = process.env.NEXT_PUBLIC_HOST;
export const loginAuth = async (email, password) => {
  try {
    const response = await fetch(`${host}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching recent messages:", error.message);
  }
};
export const signupAuth = async (
  name,
  email,
  username,
  password,
  gender,
  image
) => {
  try {
    const response = await fetch(`${host}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
        gender: gender,
        image: image,
      }),
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching recent messages:", error.message);
  }
};
export const verification = async (id, code) => {
  try {
    const response = await fetch(`${host}/auth/email-verification/${id}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: Number(code),
      }),
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching recent messages:", error.message);
  }
};

export const changeAvatar = async (id, src) => {
  try {
    const response = await fetch(`${host}/auth/setAvatar/${id}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: src,
      }),
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching recent messages:", error.message);
  }
};
