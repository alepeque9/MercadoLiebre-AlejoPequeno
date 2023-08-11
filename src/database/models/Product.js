module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        vendedor: {
            type: dataTypes.INTEGER
        },
        nombre_prod: {
            type: dataTypes.STRING,
        },
        precio: {
            type: dataTypes.FLOAT,
        },
        categoria: {
            type: dataTypes.STRING,
        },
        descripcion: {
            type: dataTypes.STRING,
        },
        oferta: {
            type: dataTypes.BOOLEAN,
        },
        imagen: {
            type: dataTypes.STRING,
        },
    };
    let config = {
        tableName: "product",
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    return Product;
}