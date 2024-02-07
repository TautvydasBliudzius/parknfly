export interface Admin {
    email: string;
    password: string;
    name: string;
    surname: string;
  }
  
  export const showAdminFullName = (admin: Admin | null): string => {
    return admin ? `${admin.name} ${admin.surname}` : "";
  };
  
  export const checkAdminCredentials = (admins: Admin[], checkingAdmin: { email: string; password: string }): Admin | null => {
    const checkingEmail = checkingAdmin.email.toLowerCase();
    return admins.find((admin) => {
      const storedEmail = admin.email.toLowerCase();
      return storedEmail === checkingEmail && admin.password === checkingAdmin.password;
    }) || null;
  };
  