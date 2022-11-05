const User = (props) => {
  const { width = 18, height = 20, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const Cart = (props) => {
  const { width = 24, height = 23, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 23"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const EnvelopeOutline = (props) => {
  const { width = 28, height = 27, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 27"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.9375 4.5H5.0625C3.90234 4.5 3 5.44531 3 6.5625V18.9375C3 20.0977 3.90234 21 5.0625 21H22.9375C24.0547 21 25 20.0977 25 18.9375V6.5625C25 5.44531 24.0547 4.5 22.9375 4.5ZM22.9375 6.5625V8.32422C21.9492 9.14062 20.4023 10.3438 17.1367 12.9219C16.4062 13.4805 14.9883 14.8555 14 14.8125C12.9688 14.8555 11.5508 13.4805 10.8203 12.9219C7.55469 10.3438 6.00781 9.14062 5.0625 8.32422V6.5625H22.9375ZM5.0625 18.9375V10.9883C6.00781 11.7617 7.42578 12.8789 9.53125 14.5547C10.4766 15.2852 12.1523 16.918 14 16.875C15.8047 16.918 17.4375 15.2852 18.4258 14.5547C20.5312 12.8789 21.9492 11.7617 22.9375 10.9883V18.9375H5.0625Z"
        fill="#C4C4C4"
      />
    </svg>
  );
};

const PaperPlane = (props) => {
  const { width = 16, height = 16, color = "#ffff" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L277.3 424.9l-40.1 74.5c-5.2 9.7-16.3 14.6-27 11.9S192 499 192 488V392c0-5.3 1.8-10.5 5.1-14.7L362.4 164.7c2.5-7.1-6.5-14.3-13-8.4L170.4 318.2l-32 28.9 0 0c-9.2 8.3-22.3 10.6-33.8 5.8l-85-35.4C8.4 312.8 .8 302.2 .1 290s5.5-23.7 16.1-29.8l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
    </svg>
  );
};

const Truck = (props) => {
  const { width = 46, height = 46, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 46"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.6591 35.3637C33.6046 35.3637 35.1818 33.7865 35.1818 31.841C35.1818 29.8954 33.6046 28.3182 31.6591 28.3182C29.7135 28.3182 28.1364 29.8954 28.1364 31.841C28.1364 33.7865 29.7135 35.3637 31.6591 35.3637Z"
        stroke="black"
        stroke-width="2.81818"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3409 35.3637C15.2865 35.3637 16.8636 33.7865 16.8636 31.841C16.8636 29.8954 15.2865 28.3182 13.3409 28.3182C11.3954 28.3182 9.81818 29.8954 9.81818 31.841C9.81818 33.7865 11.3954 35.3637 13.3409 35.3637Z"
        stroke="black"
        stroke-width="2.81818"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28.1364 17.0454H33.7727L38 21.2727V28.3181H28.1364V17.0454Z"
        stroke="black"
        stroke-width="2.81818"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28.1364 10H7V28.3182H28.1364V10Z"
        stroke="black"
        stroke-width="2.81818"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const Bag = (props) => {
  const { width = 46, height = 46, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 46"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.2 9L10 14.6V34.2C10 34.9426 10.295 35.6548 10.8201 36.1799C11.3452 36.705 12.0574 37 12.8 37H32.4C33.1426 37 33.8548 36.705 34.3799 36.1799C34.905 35.6548 35.2 34.9426 35.2 34.2V14.6L31 9H14.2Z"
        stroke="black"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M28.2 20.2C28.2 21.6852 27.61 23.1095 26.5598 24.1597C25.5096 25.21 24.0852 25.8 22.6 25.8C21.1148 25.8 19.6904 25.21 18.6402 24.1597C17.59 23.1095 17 21.6852 17 20.2"
        stroke="black"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 14.6H35.2"
        stroke="black"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const Support = (props) => {
  const { width = 46, height = 46, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 46"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 37C29.9558 37 36 30.9558 36 23.5C36 16.0442 29.9558 10 22.5 10C15.0442 10 9 16.0442 9 23.5C9 30.9558 15.0442 37 22.5 37Z"
        stroke="black"
        stroke-width="2.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.5 28.9C25.4823 28.9 27.9 26.4823 27.9 23.5C27.9 20.5176 25.4823 18.1 22.5 18.1C19.5177 18.1 17.1 20.5176 17.1 23.5C17.1 26.4823 19.5177 28.9 22.5 28.9Z"
        stroke="black"
        stroke-width="2.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.3205 27.3204L32.0445 33.0444"
        stroke="black"
        stroke-width="2.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.9555 33.0444L18.6795 27.3204"
        stroke="black"
        stroke-width="2.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.3205 19.6796L32.0445 13.9556"
        stroke="black"
        stroke-width="2.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.3205 19.6796L31.086 14.9141"
        stroke="black"
        stroke-width="2.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.9555 13.9556L18.6795 19.6796"
        stroke="black"
        stroke-width="2.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const Return = (props) => {
  const { width = 46, height = 46, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 46"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3333 37.3333L11 32L16.3333 26.6666"
        stroke="black"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M35 23.9999V26.6665C35 28.081 34.4381 29.4376 33.4379 30.4378C32.4377 31.438 31.0812 31.9999 29.6667 31.9999H11"
        stroke="black"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.6667 7.99988L35 13.3332L29.6667 18.6665"
        stroke="black"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 21.3333V18.6666C11 17.2521 11.5619 15.8955 12.5621 14.8953C13.5623 13.8952 14.9188 13.3333 16.3333 13.3333H35"
        stroke="black"
        stroke-width="2.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const Icons = {
  User,
  Cart,
  EnvelopeOutline,
  PaperPlane,
  Truck,
  Bag,
  Support,
  Return,
};

export default Icons;
