const animationClassData = [
  {
    label: "进入",
    children: [
      { label: "渐显", value: "fadeIn" },
      { label: "向右进入", value: "fadeInLeft" },
      { label: "向左进入", value: "fadeInRight" },
      { label: "向上进入", value: "fadeInUp" },
      { label: "向下进入", value: "fadeInDown" },
      { label: "向右长距进入", value: "fadeInLeftBig" },
      { label: "向左长距进入", value: "fadeInRightBig" },
      { label: "向上长距进入", value: "fadeInUpBig" },
      { label: "向下长距进入", value: "fadeInDownBig" },
      { label: "旋转进入", value: "rotateIn" },
      { label: "左顺时针旋转", value: "rotateInDownLeft" },
      { label: "右逆时针旋转", value: "rotateInDownRight" },
      { label: "左逆时针旋转", value: "rotateInUpLeft" },
      { label: "右顺时针旋转", value: "rotateInUpRight" },
    ],
  },
  {
    label: "退出",
    children: [
      { label: "渐隐", value: "fadeOut" },
      { label: "向左退出", value: "fadeOutLeft" },
      { label: "向右退出", value: "fadeOutRight" },
      { label: "向上退出", value: "fadeOutUp" },
      { label: "向下退出", value: "fadeOutDown" },
      { label: "向左长距退出", value: "fadeOutLeftBig" },
      { label: "向右长距退出", value: "fadeOutRightBig" },
      { label: "向上长距退出", value: "fadeOutUpBig" },
      { label: "向下长距退出", value: "fadeOutDownBig" },
      { label: "旋转退出", value: "rotateOut" },
      { label: "左顺时针旋转", value: "rotateOutDownLeft" },
      { label: "右逆时针旋转", value: "rotateOutDownRight" },
      { label: "左逆时针旋转", value: "rotateOutUpLeft" },
      { label: "右逆时针旋转", value: "rotateOutUpRight" },
    ],
  },
];

animationClassData.forEach((item) => {
  item.children.forEach((e) => {
    // 是否在运行动画
    e["pending"] = false;

    // 动画默认运行时间
    //e["animationTime"] = 1;
  });
});

export default animationClassData;
