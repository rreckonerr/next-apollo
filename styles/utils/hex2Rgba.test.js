/**
 * Module dependencies.
 */
import { hex2Rgba } from "./hex2Rgba";

/**
 * Tests.
 */
describe("hex2Rgba", () => {
  it("throws error if first argument is invalid", () => {
    const badArgHex2Rgba = () => {
      [
        undefined,
        null,
        0,
        false,
        Object,
        Function,
        "",
        "xxx",
        "gggggg",
        "#zzz",
        "#oooooo"
      ].forEach(value => {
        hex2Rgba(value);
      });
    };
    expect(badArgHex2Rgba).toThrowError(
      "hex2rgba: first argument has invalid hexadecimal characters"
    );
  });

  it("throws error if hexadecimal length is invalid", () => {
    const badLengthHex2Rgba = () => {
      [
        "b",
        "b0",
        "b000",
        "b000",
        "b0000",
        "b000000",
        "#b",
        "#b0",
        "#b000",
        "#b0000",
        "#b000000"
      ].forEach(value => {
        hex2Rgba(value);
      });
      expect(badLengthHex2Rgba).toThrowError(
        "hex2rgba: first argument has invalid hexadecimal length"
      );
    };
  });

  it("converts shorthand hexadecimal", () => {
    expect(hex2Rgba("FB1")).toEqual("rgba(255,187,17,1)");
    expect(hex2Rgba("1CE")).toEqual("rgba(17,204,238,1)");
  });

  it("converts hexadecimal without `#`", () => {
    expect(hex2Rgba("bada55")).toEqual("rgba(186,218,85,1)");
    expect(hex2Rgba("A55")).toEqual("rgba(170,85,85,1)");
  });

  it("converts hexadecimal with `#`", () => {
    expect(hex2Rgba("#bada55")).toEqual("rgba(186,218,85,1)");
    expect(hex2Rgba("#A55")).toEqual("rgba(170,85,85,1)");
  });

  it("converts case-insensitive hexadecimal", () => {
    expect(hex2Rgba("C0FFEE")).toEqual("rgba(192,255,238,1)");
    expect(hex2Rgba("c0fFEe")).toEqual("rgba(192,255,238,1)");
    expect(hex2Rgba("facade")).toEqual("rgba(250,202,222,1)");
    expect(hex2Rgba("Facade")).toEqual("rgba(250,202,222,1)");
    expect(hex2Rgba("FACADE")).toEqual("rgba(250,202,222,1)");
  });

  it("overrides default alpha value if valid", () => {
    expect(hex2Rgba("f00", 0.42)).toEqual("rgba(255,0,0,0.42)");
    expect(hex2Rgba("ff0000", "0")).toEqual("rgba(255,0,0,0)");
    expect(hex2Rgba("#f00", 1)).toEqual("rgba(255,0,0,1)");
  });

  it("does not override default alpha value if invalid", () => {
    expect(hex2Rgba("f00", "zero")).toEqual("rgba(255,0,0,1)");
    expect(hex2Rgba("f00", -1)).toEqual("rgba(255,0,0,1)");
    expect(hex2Rgba("f00", 1.1)).toEqual("rgba(255,0,0,1)");
  });
});
