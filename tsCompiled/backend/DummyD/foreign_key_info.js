"use strict";
module.exports = {
    // This query lists each table that has a foreign key, the name of the table that key points to, and the name of the column at which the foreign key constraint resides
    getForeignKeys: "select kcu.table_name as foreign_table,\n          rel_kcu.table_name as primary_table,\n          kcu.column_name as fk_column\n    from information_schema.table_constraints tco\n    join information_schema.key_column_usage kcu\n              on tco.constraint_name = kcu.constraint_name\n    join information_schema.referential_constraints rco\n              on tco.constraint_name = rco.constraint_name\n    join information_schema.key_column_usage rel_kcu\n              on rco.unique_constraint_name = rel_kcu.constraint_name\n    where tco.constraint_type = 'FOREIGN KEY'\n    order by kcu.table_schema,\n            kcu.table_name,\n            kcu.ordinal_position;",
    // This query lists each table and the column name at which there is a primary key
    getPrimaryKeys: "select kcu.table_name as table_name,\n      kcu.column_name as pk_column\n    from information_schema.key_column_usage as kcu\n    join information_schema.table_constraints as tco\n      on tco.constraint_name = kcu.constraint_name\n    where tco.constraint_type = 'PRIMARY KEY'\n    order by kcu.table_name;",
};
// structure of the key object for generating key compliant data
// const KeyObject = {
//   // people:
//   Table_1: {
//       primaryKeyColumns: {
//           // id: true
//           _id: true
//       }
//       foreignKeyColumns: {
//           // species_id: n where n is the number of rows asked for in the primary table the key points to
//           foreignKeyColumnName_1: numOfRows,
//           foreignKeyColumnName_2: numOfRows
//       }
//   }
//   .
//   .
//   .
// }
//# sourceMappingURL=foreign_key_info.js.map