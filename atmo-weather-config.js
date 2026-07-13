export function migrateConfig(raw) {
  const c = { ...raw };
  const rename = (oldKey, newKey) => {
    if (c[oldKey] !== undefined && c[newKey] === undefined) {
      c[newKey] = c[oldKey];
    }
    delete c[oldKey];
  };
  rename("offset", "card_offset");
  rename("square", "card_square");
  rename("stack_order", "card_stack_order");
  rename("full_width", "card_full_width");
  rename("filter", "card_filter");
  rename("css_mask_vertical", "card_mask_vertical");
  rename("css_mask_horizontal", "card_mask_horizontal");
  rename("disable_text", "card_hide_text");
  rename("tap_action", "card_tap_action");
  rename("background_style", "card_background_style");
  rename("day", "image_day");
  rename("night", "image_night");
  rename("theme", "card_color_mode");
  rename("sun_moon_size", "celestial_size");
  rename("moon_style", "celestial_moon_style");
  if (c.celestial_alignment === undefined) {
    const oldX =
        c.sun_moon_x_position != null ? c.sun_moon_x_position : c.celestial_x,
      oldY =
        c.sun_moon_y_position != null ? c.sun_moon_y_position : c.celestial_y;
    if (oldX !== undefined || oldY !== undefined) {
      const xStr = String(oldX != null ? oldX : "")
          .trim()
          .toLowerCase(),
        yStr = String(oldY != null ? oldY : "")
          .trim()
          .toLowerCase(),
        xIsCenter = xStr === "center";
      const yIsCenter = yStr === "center",
        xVal = xIsCenter ? 0 : parseInt(xStr, 10) || 0,
        yVal = yIsCenter ? 0 : parseInt(yStr, 10) || 0;
      const hSide = xIsCenter ? "center" : xVal < 0 ? "right" : "left",
        vSide = yIsCenter ? "center" : yVal < 0 ? "bottom" : "top";
      if (hSide === "center" && vSide === "center") {
        c.celestial_alignment = "center";
      } else if (vSide === "center") {
        c.celestial_alignment = hSide;
      } else {
        c.celestial_alignment = `${vSide}-${hSide}`;
      }
      c.celestial_x = xIsCenter ? 0 : Math.max(0, Math.abs(xVal) - 31);
      c.celestial_y = yIsCenter ? 0 : Math.max(0, Math.abs(yVal) - 31);
    }
  }
  delete c.sun_moon_x_position;
  delete c.sun_moon_y_position;
  rename("image_offset_x", "image_x");
  rename("image_offset_y", "image_y");
  rename("status_image_day", "status_day");
  rename("status_image_night", "status_night");
  rename("disable_top_text", "top_text_hide");
  rename("top_text_sensor", "top_text_entity");
  rename("top_position", "top_text_position");
  rename("top_font_size", "top_text_size");
  rename("top_unit_format", "top_text_unit");
  rename("top_text_behind_weather", "top_text_behind");
  const hasTopTextKeys =
    c.top_text_hide !== undefined ||
    c.top_text_entity !== undefined ||
    c.top_text_position !== undefined ||
    c.top_text_size !== undefined ||
    c.top_text_unit !== undefined ||
    c.top_text_padding !== undefined ||
    c.top_text_background !== undefined ||
    c.top_text_behind !== undefined;
  if (hasTopTextKeys && c.top_text_hide !== true) {
    const topChip = {
      entity: c.top_text_entity || c.weather_entity || "weather.home",
      position: "custom",
      position_anchor: c.top_text_position || "top-left",
      position_x: "pad",
      position_y: "pad",
      text_size: c.top_text_size || "clamp(24px, 11cqw, 52px)",
      padding: c.top_text_padding || "0px 4px",
      background: false,
      hide_icon: true,
      hide_label: true,
    };
    if (!c.top_text_entity) {
      topChip.attribute = "temperature";
      topChip.fancy_unit = true;
    }
    if (c.top_text_unit !== undefined) topChip.unit_format = c.top_text_unit;
    if (c.top_text_background === true) topChip.background = true;
    if (c.top_text_behind === true) topChip.behind_effects = true;
    c.chips = [topChip, ...(Array.isArray(c.chips) ? c.chips : [])];
  }
  const hasLegacyChipAreaKeys =
    c.chips_position !== undefined ||
    c.chips_layout !== undefined ||
    c.chips_background !== undefined ||
    c.disable_chips !== undefined;
  delete c.top_text_hide;
  delete c.top_text_entity;
  delete c.top_text_position;
  delete c.top_text_size;
  delete c.top_text_unit;
  delete c.top_text_padding;
  delete c.top_text_background;
  delete c.top_text_behind;
  rename("disable_chips", "chip_area_hide");
  rename("chips_position", "chip_area_position");
  rename("chips_layout", "chip_area_layout");
  rename("chips_columns", "chip_area_columns");
  rename("chips_visible", "chip_area_scroll_count");
  rename("chips_width", "chip_area_width");
  rename("chips_height", "chip_area_height");
  rename("chips_align", "chip_area_align");
  rename("chips_grouped", "chip_area_grouped");
  rename("chips_separator", "chip_area_separator");
  rename("chips_full_width", "chip_area_full_width");
  rename("chips_container_padding", "chip_area_padding");
  rename("chips_container_bg_color", "chip_area_background_color");
  rename("chips_background", "chip_area_background");
  if (c.chip_inner_gap !== undefined) {
    if (c.chip_area_gap === undefined && c.chip_gap !== undefined)
      c.chip_area_gap = c.chip_gap;
    c.chip_gap = c.chip_inner_gap;
    delete c.chip_inner_gap;
  } else if (c.chip_gap !== undefined && c.chip_area_gap === undefined) {
    if (hasLegacyChipAreaKeys) {
      c.chip_area_gap = c.chip_gap;
      delete c.chip_gap;
    }
  }
  rename("chip_format", "chip_style");
  rename("chips_font_size", "chip_text_size");
  rename("chips_name_font_size", "chip_label_size");
  rename("chips_padding", "chip_padding");
  rename("chip_icon_width", "chip_icon_size");
  rename("chip_icon_bg", "chip_icon_background");
  rename("chips_bg_color", "chip_background_color");
  rename("chips_icon_bg_color", "chip_icon_background_color");
  rename("chip_bg_color", "chip_background_color");
  rename("chip_icon_bg_color", "chip_icon_background_color");
  rename("chip_area_bg_color", "chip_area_background_color");
  if (c.chip_area_layout === "scroll") c.chip_area_layout = "horizontal-scroll";
  if (Array.isArray(c.chips)) {
    c.chips = c.chips.map((chip) => {
      if (!chip || typeof chip !== "object") return chip;
      const s = { ...chip };
      const r = (o, n) => {
        if (s[o] !== undefined && s[n] === undefined) s[n] = s[o];
        delete s[o];
      };
      r("chip_format", "style");
      r("chip_align", "align");
      r("chip_background", "background");
      r("chip_bg_color", "background_color");
      r("bg_color", "background_color");
      r("chip_icon_bg_color", "icon_background_color");
      r("icon_bg_color", "icon_background_color");
      r("icon_bg", "icon_background");
      r("chip_padding", "padding");
      r("disable_icon", "hide_icon");
      r("font_size", "text_size");
      r("name_font_size", "label_size");
      if (s.overflow === "marquee" && s.label_overflow === undefined)
        s.label_overflow = "marquee";
      r("behind", "behind_effects");
      r("card_tap_action", "tap_action");
      if (s.forecast_show_min && s.forecast && s.attribute === "temperature") {
        if (!s.sub_value_attribute) s.sub_value_attribute = "templow";
        if (s.forecast_low_position !== "below")
          s.sub_value_position = "beside";
      }
      delete s.forecast_show_min;
      delete s.forecast_low_position;
      return s;
    });
  }
  return c;
}
