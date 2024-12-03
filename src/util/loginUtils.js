export function login(id, password) {
  localStorage.setItem("userId", id);
  localStorage.setItem("userPassword", password);
}

export function logout() {
  localStorage.setItem("userId", null);
  localStorage.setItem("userPassword", null);
}
