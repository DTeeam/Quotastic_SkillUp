import { makeAutoObservable } from 'mobx';
import { UserType } from 'models/auth';
import { userStorage } from 'utils/localStorage';

export interface AuthContextType {
  user?: UserType | null;
  login: () => void;
  signout: () => void;
}

class AuthStore {
  user?: UserType | null = userStorage.getUser() || null;

  constructor() {
    makeAutoObservable(this);
  }

  login(user: UserType) {
    userStorage.setUser(user);
    this.user = user;
  }

  signout() {
    userStorage.clearUser();
    this.user = undefined;
  }

  updateUser(user: UserType | null) {
    this.user = user;
  }
}

const authStore = new AuthStore();
export default authStore;
