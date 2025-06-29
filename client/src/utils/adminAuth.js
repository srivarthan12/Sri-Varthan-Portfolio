export const isAdminAuthenticated = () => {
  const token = localStorage.getItem("adminToken");
  return !!token;
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
};
