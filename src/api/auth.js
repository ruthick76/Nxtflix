/**
 * Authentication module.
 * Sends user credentials to the authentication server.
 */

const LOGIN_URL = "https://serverless-api-teal.vercel.app/api/auth/signin";

export default async function loginUser(email, password) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // Safe fallback if the endpoint returns non-JSON (like a 500 HTML error page)
  let result;
  try {
    result = await response.json();
  } catch (err) {
    throw new Error("Unable to parse server response. Please try again later.");
  }

  // Handle standard HTTP failure status codes (4xx, 5xx)
  if (!response.ok) {
    const errorMsg = result?.message || result?.error || "Login failed. Please check your credentials.";
    throw new Error(errorMsg);
  }

  // Handle explicit API failure flags (e.g., { success: false })
  if (result.success === false) {
    throw new Error(result.message || result.error || "Invalid email or password.");
  }

  return result;
}