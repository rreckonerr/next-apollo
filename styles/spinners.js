export const BallsSpinner = () => (
  <div style={{ maxWidth: "200px", margin: "0 auto" }}>
    <svg
      width="200px"
      height="200px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-ball2"
      style={{ background: "none" }}
    >
      <g
        ng-attr-transform="translate(0,{{config.dy}})"
        transform="translate(0,-7.5)"
      >
        <circle
          cx="50"
          ng-attr-cy="{{config.cy}}"
          r="5.35876"
          ng-attr-fill="{{config.c1}}"
          cy="41"
          fill="#3be8b0"
          transform="rotate(290.701 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            calcMode="spline"
            values="0;15;0"
            keyTimes="0;0.5;1"
            dur="1"
            keySplines="0.2 0 0.8 1;0.2 0 0.8 1"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50"
          ng-attr-cy="{{config.cy}}"
          r="9.64124"
          ng-attr-fill="{{config.c2}}"
          cy="41"
          fill="#1aafd0"
          transform="rotate(470.701 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="180 50 50;540 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            calcMode="spline"
            values="15;0;15"
            keyTimes="0;0.5;1"
            dur="1"
            keySplines="0.2 0 0.8 1;0.2 0 0.8 1"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  </div>
);
