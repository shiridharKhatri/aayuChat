let host = process.env.NEXT_PUBLIC_HOST;
export const profile = async (id) => {
  try {
    const response = await fetch(`${host}/auth/fetchbyid/${id}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
export const addInterest = async (data, id, token) => {
  try {
    const response = await fetch(`${host}/auth/interest/${id}`, {
      method: "POST",
      body: JSON.stringify({
        data: data,
      }),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "auth-token": token,
      },
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (data, id, token) => {
  try {
    const response = await fetch(`${host}/auth/editProfile/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        age: data.age,
        location: data.location,
        number: data.number,
      }),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "auth-token": token,
      },
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAccount = async (id, token) => {
  try {
    const response = await fetch(`${host}/auth/account/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "auth-token": token,
      },
      cache: "default",
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
