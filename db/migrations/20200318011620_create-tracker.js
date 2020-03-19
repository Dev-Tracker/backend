exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users.string("first_name").notNullable();
      users.string("last_name").notNullable();
      users
        .string("email")
        .unique()
        .notNullable();
      users.string("password").notNullable();
    })
    .createTable("avatars", avatar => {
      avatar.increments();
      avatar.string("image");
      avatar
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("profiles", profiles => {
      profiles.increments();
      profiles.integer("age");
      profiles.string("location");
      profiles.integer("experience");
      profiles.boolean("premium").defaultTo(false);
      profiles.date("birthday");
      profiles
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("networks", network => {
      network.increments();
      network.string("first_name");
      network.string("last_name");
      network.string("email");
      network.string("company");
      network.string("role");
      network.bigInteger("phone_number");
      network
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("links", links => {
      links.increments();
      links.string("link_1").unique();
      links.string("link_2").unique();
      links.string("link_3").unique();
      links.string("link_4").unique();
      links
        .integer("network_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("networks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("contact_notes", notes => {
      notes.increments();
      notes.string("note").notNullable();
      notes.timestamp("created_at", { useTz: true });
      notes
        .integer("network_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("networks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("applications", applications => {
      applications.increments();
      applications.string("company").notNullable();
      applications.string("role");
      applications.string("link");
      applications.string("source");
      applications.string("stage");
      applications
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("notes", notes => {
      notes.increments();
      notes.string("note").notNullable();
      notes.timestamp("created_at", { useTz: true });
      notes.bigInteger("due");
      notes
        .integer("application_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("applications")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("materials", materials => {
      materials.increments();
      materials.string("type");
      materials.string("file");
      materials.string("name");
      materials
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("application_material", bridge => {
      bridge.primary(["application_id", "material_id"]);
      bridge
        .integer("application_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("applications")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      bridge
        .integer("material_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("materials")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("application_network", bridge => {
      bridge.primary(["application_id", "network_id"]);
      bridge
        .integer("application_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("applications")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      bridge
        .integer("network_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("networks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {};
