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

const Cross = (props) => {
  const { width = 18, height = 18, color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="9"
        y1="4.37114e-08"
        x2="9"
        y2="18"
        stroke="white"
        stroke-width="2"
      />
      <line y1="9" x2="18" y2="9" stroke="white" stroke-width="2" />
    </svg>
  );
};

const Location = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 16 16"
    >
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
};

const Envelope = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 16 16"
    >
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
    </svg>
  );
};

const Telephone = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
      />
    </svg>
  );
};

const Remove = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 320 512"
    >
      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
    </svg>
  );
};

const Minus = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 448 512"
    >
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </svg>
  );
};

const Plus = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 448 512"
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  );
};

const Star = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 576 512"
    >
      <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />
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
  Cross,
  Location,
  Envelope,
  Telephone,
  Remove,
  Minus,
  Plus,
  Star
};

export default Icons;
