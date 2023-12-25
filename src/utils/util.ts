import { nanoid } from "nanoid";

const needUnit = [
  "fontSize",
  "width",
  "height",
  "top",
  "left",
  "borderWidth",
  "letterSpacing",
  "borderRadius",
  "lineHeight",
  "paddingLeft",
  "paddingRight",
  "paddingBottom",
  "paddingTop",
];

// 主要用于 Vue 的 diff 算法，为每个元素创建一个独一无二的 ID
export function generateID() {
  return nanoid();
}

export function deepCopy(target: any) {
  if (typeof target == "object") {
    const result = Array.isArray(target) ? [] : {};
    for (const key in target) {
      if (typeof target[key] == "object") {
        result[key] = deepCopy(target[key]);
      } else {
        result[key] = target[key];
      }
    }

    return result;
  }

  return target;
}

export function getShapeStyle(style: any, index: number) {
  const result = {};
  result["z-index"] = index;
  ["width", "height", "top", "left"].forEach((attr) => {
    result[attr] = style[attr] + "px";
  });

  return result;
}

export function getComponentStyle(style: any, index: number, comType?: string) {
  const result: any = {};
  result["z-index"] = index;
  Object.keys(style).forEach((key) => {
    if (style[key] !== "") {
      if (needUnit.includes(key)) {
        result[key] = style[key] + "px";
      } else {
        result[key] = style[key];
      }
    }
  });
  if (comType === "VText") {
    delete result["width"];
  }
  return result;
}

export function getCanvansStyle(style: any) {
  const needUnit: string[] = ["width", "height", "fontSize"];
  const result = {} as any;
  Object.keys(style).forEach((key: string) => {
    if (needUnit.includes(key)) {
      result[key] = style[key] + "px";
    } else if (key === "scale") {
      result.scale = style.scale / 100;
    } else {
      result[key] = style[key];
    }
  });
  return result;
}

export function swap(array: any[], first: number, second: number) {
  const temp = array[second];
  array[second] = array[first];
  array[first] = temp;
}
