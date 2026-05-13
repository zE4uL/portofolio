"use client";

export default function Controller() {
  return (
    <div className="nes-controller" aria-hidden="true">
      <span className="nes-cable" />
      <span className="nes-screw nes-screw-tl" />
      <span className="nes-screw nes-screw-tr" />
      <span className="nes-screw nes-screw-bl" />
      <span className="nes-screw nes-screw-br" />
      <div className="nes-face">
        <div className="nes-well nes-well-dpad">
          <div className="nes-dpad">
            <span className="nes-dpad-h" />
            <span className="nes-dpad-v" />
            <span className="nes-dpad-center" />
          </div>
        </div>
        <div className="nes-center">
          <div className="nes-labels">
            <span>SELECT</span>
            <span>START</span>
          </div>
          <div className="nes-select-start">
            <span className="nes-pill" />
            <span className="nes-pill" />
          </div>
        </div>
        <div className="nes-well nes-well-ab">
          <button type="button" tabIndex={-1} className="nes-btn nes-b"><span>B</span></button>
          <button type="button" tabIndex={-1} className="nes-btn nes-a"><span>A</span></button>
        </div>
      </div>
    </div>
  );
}
