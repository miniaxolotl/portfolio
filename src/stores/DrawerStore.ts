import { makeAutoObservable } from "mobx";

class DrawerStore {
  open = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOpen = (value: boolean) => {
    this.open = value;
  };

  toggle = () => {
    this.open = !this.open;
  };
}

export const drawerStore = new DrawerStore();
