/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("programs");

  const fields = [
    new SelectField({
      name: "program_format",
      required: false,
      maxSelect: 1,
      values: ["standard", "sprint", "adaptive"],
    }),
    new SelectField({
      name: "ai_mode",
      required: false,
      maxSelect: 1,
      values: ["static", "jordy_guided", "jordy_generated"],
    }),
    new SelectField({
      name: "visual_theme",
      required: false,
      maxSelect: 1,
      values: ["ocean", "sunrise", "forest", "midnight", "citrus"],
    }),
    new SelectField({
      name: "visual_icon",
      required: false,
      maxSelect: 1,
      values: ["spark", "target", "brain", "bolt", "mountain"],
    }),
    new TextField({
      name: "cover_image",
      required: false,
      max: 500,
    }),
    new TextField({
      name: "jordy_personalization_hint",
      required: false,
      max: 500,
    }),
  ];

  fields.forEach((field) => {
    const existing = collection.fields.getByName(field.name);
    if (existing) {
      collection.fields.removeByName(field.name);
    }
    collection.fields.add(field);
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("programs");
  [
    "program_format",
    "ai_mode",
    "visual_theme",
    "visual_icon",
    "cover_image",
    "jordy_personalization_hint",
  ].forEach((fieldName) => {
    collection.fields.removeByName(fieldName);
  });
  return app.save(collection);
})
