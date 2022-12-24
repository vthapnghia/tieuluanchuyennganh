const User = (props) => {
  const { width = 18, height = 20, color = "white", bg_color = "none" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill={bg_color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="2.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3409 35.3637C15.2865 35.3637 16.8636 33.7865 16.8636 31.841C16.8636 29.8954 15.2865 28.3182 13.3409 28.3182C11.3954 28.3182 9.81818 29.8954 9.81818 31.841C9.81818 33.7865 11.3954 35.3637 13.3409 35.3637Z"
        stroke="black"
        strokeWidth="2.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.1364 17.0454H33.7727L38 21.2727V28.3181H28.1364V17.0454Z"
        stroke="black"
        strokeWidth="2.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.1364 10H7V28.3182H28.1364V10Z"
        stroke="black"
        strokeWidth="2.81818"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.2 20.2C28.2 21.6852 27.61 23.1095 26.5598 24.1597C25.5096 25.21 24.0852 25.8 22.6 25.8C21.1148 25.8 19.6904 25.21 18.6402 24.1597C17.59 23.1095 17 21.6852 17 20.2"
        stroke="black"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.6H35.2"
        stroke="black"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 28.9C25.4823 28.9 27.9 26.4823 27.9 23.5C27.9 20.5176 25.4823 18.1 22.5 18.1C19.5177 18.1 17.1 20.5176 17.1 23.5C17.1 26.4823 19.5177 28.9 22.5 28.9Z"
        stroke="black"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.3205 27.3204L32.0445 33.0444"
        stroke="black"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9555 33.0444L18.6795 27.3204"
        stroke="black"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.3205 19.6796L32.0445 13.9556"
        stroke="black"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.3205 19.6796L31.086 14.9141"
        stroke="black"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9555 13.9556L18.6795 19.6796"
        stroke="black"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 23.9999V26.6665C35 28.081 34.4381 29.4376 33.4379 30.4378C32.4377 31.438 31.0812 31.9999 29.6667 31.9999H11"
        stroke="black"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.6667 7.99988L35 13.3332L29.6667 18.6665"
        stroke="black"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 21.3333V18.6666C11 17.2521 11.5619 15.8955 12.5621 14.8953C13.5623 13.8952 14.9188 13.3333 16.3333 13.3333H35"
        stroke="black"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="2"
      />
      <line y1="9" x2="18" y2="9" stroke="white" strokeWidth="2" />
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
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
};

const Menu = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 448 512"
    >
      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    </svg>
  );
};

const ArrowLeft = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 448 512"
    >
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
    </svg>
  );
};

const ArrowRight = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 448 512"
    >
      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
    </svg>
  );
};

const Exclamation = (props) => {
  const { width = 16, height = 16, color = "red" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 512 512"
    >
      <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
    </svg>
  );
};

const Lock = (props) => {
  const { width = 16, height = 16, color = "none" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 448 512"
    >
      <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
    </svg>
  );
};

const Email = (props) => {
  const { width = 16, height = 16, color = "none" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 512 512"
    >
      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
    </svg>
  );
};

const Edit = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 512 512"
    >
      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
    </svg>
  );
};

const Trash = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 448 512"
    >
      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
    </svg>
  );
};

const Search = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 512 512"
    >
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
    </svg>
  );
};

const SortUp = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 320 512"
    >
      <path
        width={width}
        height={height}
        d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
      />
    </svg>
  );
};

const SortDown = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 320 512">
      <path
        width={width}
        height={height}
        d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
      />
    </svg>
  );
};

const Google = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 488 512"
    >
      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
    </svg>
  );
};

const Sort = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 320 512"
    >
      <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
    </svg>
  );
};

const Receipt = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 384 512"
    >
      <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.2-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.2 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" />
    </svg>
  );
};

const TruckFull = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 640 512"
    >
      <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM208 416c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zm272 48c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z" />
    </svg>
  );
};

const BoxOpen = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 640 512"
    >
      <path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z" />
    </svg>
  );
};

const Ticked = (props) => {
  const { width = 16, height = 16, color = "currentcolor" } = props;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 576 512"
    >
      <path d="M64 64C28.7 64 0 92.7 0 128v80c26.5 0 48 21.5 48 48s-21.5 48-48 48v80c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V304c-26.5 0-48-21.5-48-48s21.5-48 48-48V128c0-35.3-28.7-64-64-64H64zm64 96l0 192H448V160H128zm-32 0c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z" />
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
  Star,
  Menu,
  ArrowLeft,
  ArrowRight,
  Exclamation,
  Lock,
  Email,
  Edit,
  Trash,
  Search,
  SortDown,
  SortUp,
  Google,
  Sort,
  Receipt,
  TruckFull,
  BoxOpen,
  Ticked
};

export default Icons;
