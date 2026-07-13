import { test } from "node:test";
import assert from "node:assert";

import { migrateConfig } from "../atmo-weather-config.js";

const topLevelRenamePairs = [
  ["offset", "card_offset"],
  ["square", "card_square"],
  ["stack_order", "card_stack_order"],
  ["full_width", "card_full_width"],
  ["filter", "card_filter"],
  ["css_mask_vertical", "card_mask_vertical"],
  ["css_mask_horizontal", "card_mask_horizontal"],
  ["disable_text", "card_hide_text"],
  ["tap_action", "card_tap_action"],
  ["background_style", "card_background_style"],
  ["day", "image_day"],
  ["night", "image_night"],
  ["theme", "card_color_mode"],
  ["sun_moon_size", "celestial_size"],
  ["moon_style", "celestial_moon_style"],
  ["image_offset_x", "image_x"],
  ["image_offset_y", "image_y"],
  ["status_image_day", "status_day"],
  ["status_image_night", "status_night"],
  ["disable_chips", "chip_area_hide"],
  ["chips_position", "chip_area_position"],
  ["chips_layout", "chip_area_layout"],
  ["chips_columns", "chip_area_columns"],
  ["chips_visible", "chip_area_scroll_count"],
  ["chips_width", "chip_area_width"],
  ["chips_height", "chip_area_height"],
  ["chips_align", "chip_area_align"],
  ["chips_grouped", "chip_area_grouped"],
  ["chips_separator", "chip_area_separator"],
  ["chips_full_width", "chip_area_full_width"],
  ["chips_container_padding", "chip_area_padding"],
  ["chips_container_bg_color", "chip_area_background_color"],
  ["chips_background", "chip_area_background"],
  ["chip_format", "chip_style"],
  ["chips_font_size", "chip_text_size"],
  ["chips_name_font_size", "chip_label_size"],
  ["chips_padding", "chip_padding"],
  ["chip_icon_width", "chip_icon_size"],
  ["chip_icon_bg", "chip_icon_background"],
  ["chips_bg_color", "chip_background_color"],
  ["chips_icon_bg_color", "chip_icon_background_color"],
  ["chip_bg_color", "chip_background_color"],
  ["chip_icon_bg_color", "chip_icon_background_color"],
  ["chip_area_bg_color", "chip_area_background_color"],
];

const chipRenamePairs = [
  ["chip_format", "style"],
  ["chip_align", "align"],
  ["chip_background", "background"],
  ["chip_bg_color", "background_color"],
  ["bg_color", "background_color"],
  ["chip_icon_bg_color", "icon_background_color"],
  ["icon_bg_color", "icon_background_color"],
  ["icon_bg", "icon_background"],
  ["chip_padding", "padding"],
  ["disable_icon", "hide_icon"],
  ["font_size", "text_size"],
  ["name_font_size", "label_size"],
  ["behind", "behind_effects"],
  ["card_tap_action", "tap_action"],
];

test("top-level rename pairs migrate old key to new key and remove old key", () => {
  for (const [oldKey, newKey] of topLevelRenamePairs) {
    const input = { [oldKey]: `v-${oldKey}` };
    const output = migrateConfig(input);

    assert.strictEqual(output[newKey], `v-${oldKey}`, `${oldKey} -> ${newKey}`);
    assert.ok(!(oldKey in output), `${oldKey} should be removed`);
  }
});

test("chip-level rename pairs migrate old key to new key and remove old key", () => {
  for (const [oldKey, newKey] of chipRenamePairs) {
    const input = { chips: [{ [oldKey]: `v-${oldKey}` }] };
    const output = migrateConfig(input);
    const chip = output.chips[0];

    assert.strictEqual(chip[newKey], `v-${oldKey}`, `${oldKey} -> ${newKey}`);
    assert.ok(!(oldKey in chip), `${oldKey} should be removed`);
  }
});

test("legacy top_text rename keys are consumed into generated top chip", () => {
  const output = migrateConfig({
    top_text_sensor: "sensor.outdoor",
    top_position: "top-center",
    top_font_size: "30px",
    top_unit_format: "short",
    top_text_behind_weather: true,
  });

  assert.ok(Array.isArray(output.chips));
  assert.strictEqual(output.chips.length, 1);
  assert.strictEqual(output.chips[0].entity, "sensor.outdoor");
  assert.strictEqual(output.chips[0].position_anchor, "top-center");
  assert.strictEqual(output.chips[0].text_size, "30px");
  assert.strictEqual(output.chips[0].unit_format, "short");
  assert.strictEqual(output.chips[0].behind_effects, true);

  assert.ok(!("top_text_sensor" in output));
  assert.ok(!("top_position" in output));
  assert.ok(!("top_font_size" in output));
  assert.ok(!("top_unit_format" in output));
  assert.ok(!("top_text_behind_weather" in output));
});

test("disable_top_text true prevents generated top chip", () => {
  const output = migrateConfig({
    disable_top_text: true,
    top_text_sensor: "sensor.outdoor",
  });

  assert.ok(!Array.isArray(output.chips));
  assert.ok(!("disable_top_text" in output));
});

test("rename does not overwrite existing target key", () => {
  const output = migrateConfig({ offset: 5, card_offset: 99 });

  assert.strictEqual(output.card_offset, 99);
  assert.ok(!("offset" in output));
});

test("bugfix: chip overflow marquee migrates to label_overflow marquee", () => {
  const output = migrateConfig({ chips: [{ overflow: "marquee" }] });

  assert.strictEqual(output.chips[0].label_overflow, "marquee");
});

test("bugfix guard: existing chip label_overflow is not overwritten", () => {
  const output = migrateConfig({
    chips: [{ overflow: "marquee", label_overflow: "ellipsis" }],
  });

  assert.strictEqual(output.chips[0].label_overflow, "ellipsis");
});

test("chip_area_layout scroll migrates to horizontal-scroll", () => {
  const output = migrateConfig({ chip_area_layout: "scroll" });

  assert.strictEqual(output.chip_area_layout, "horizontal-scroll");
});

test("idempotence: second migration run does not change migrated output", () => {
  const input = {
    offset: 4,
    square: true,
    chips_layout: "scroll",
    chips_position: "bottom",
    chips_background: true,
    chip_gap: 6,
    top_text_sensor: "sensor.outdoor",
    top_position: "top-center",
    top_font_size: "28px",
    top_unit_format: "short",
    top_text_behind_weather: true,
    image_offset_x: 12,
    image_offset_y: -8,
    chips: [
      {
        chip_format: "minimal",
        chip_align: "left",
        chip_bg_color: "#112233",
        chip_icon_bg_color: "#abcdef",
        icon_bg: true,
        chip_padding: "2px 6px",
        disable_icon: true,
        font_size: "14px",
        name_font_size: "10px",
        behind: true,
        card_tap_action: { action: "more-info" },
        overflow: "marquee",
      },
    ],
  };

  const once = migrateConfig(input);
  const twice = migrateConfig(once);

  assert.deepStrictEqual(twice, once);
});

test("minimal inputs produce valid objects and do not throw", () => {
  assert.doesNotThrow(() => migrateConfig({}));
  assert.doesNotThrow(() => migrateConfig({ chips: [] }));

  const outEmpty = migrateConfig({});
  const outChips = migrateConfig({ chips: [] });

  assert.ok(outEmpty && typeof outEmpty === "object");
  assert.ok(outChips && typeof outChips === "object");
  assert.ok(Array.isArray(outChips.chips));
});
