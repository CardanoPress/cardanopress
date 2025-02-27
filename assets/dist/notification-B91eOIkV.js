import { k as o } from "./util-DkhQt4IU.js";
window.addEventListener("alpine:init", () => {
  Alpine.store("toastNotification", { list: [], visible: [], init() {
    window.addEventListener("cardanoPress:addNotice", (i) => this.add(i.detail)), window.addEventListener("cardanoPress:removeNotice", (i) => this.remove(i.detail));
  }, add(i) {
    (i == null ? void 0 : i.id) || (i.id = o, i.unique = true), (i == null ? void 0 : i.unique) || this.remove(i.id), this.list.push(i), this.visible.push(i), (i == null ? void 0 : i.unique) && setTimeout(() => {
      this.remove(i.id);
    }, 5e3 * this.list.length);
  }, remove(i) {
    [this.visible, this.list].forEach((e) => {
      const t = e.find((n) => n.id === i), s = e.indexOf(t);
      0 <= s && e.splice(s, 1);
    });
  } });
});
