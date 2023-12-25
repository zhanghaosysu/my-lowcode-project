export default async function runAnimation($el: any, animations: any[] = []) {
  const play = (animation: any) =>
    new Promise<void>((resolve) => {
      const { value = "" } = animation;
      $el.classList.add(value);
      const removeAnimation = () => {
        $el.removeEventListener("animationend", removeAnimation);
        $el.removeEventListener("animationcancel", removeAnimation);
        $el.classList.remove(value);
        resolve();
      };

      $el.addEventListener("animationend", removeAnimation);
      $el.addEventListener("animationcancel", removeAnimation);
    });

  for (let i = 0, len = animations.length; i < len; i++) {
    await play(animations[i]);
  }
}
