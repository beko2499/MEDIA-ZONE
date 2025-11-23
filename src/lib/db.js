import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'products.json');

// Ensure data directory exists
const ensureDb = () => {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ products: [], lastId: 0 }, null, 2));
    }
};

export const getProducts = () => {
    ensureDb();
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
};

export const saveProduct = (product) => {
    ensureDb();
    const db = getProducts();

    // Generate new ID
    const newId = (db.lastId + 1).toString();
    const newProduct = {
        ...product,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    db.products.push(newProduct);
    db.lastId = parseInt(newId);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return newProduct;
};

export const updateProduct = (id, updates) => {
    ensureDb();
    const db = getProducts();
    const index = db.products.findIndex(p => p.id === id);

    if (index === -1) return null;

    const updatedProduct = {
        ...db.products[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    db.products[index] = updatedProduct;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return updatedProduct;
};

export const deleteProduct = (id) => {
    ensureDb();
    const db = getProducts();
    const filteredProducts = db.products.filter(p => p.id !== id);

    if (filteredProducts.length === db.products.length) return false;

    db.products = filteredProducts;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return true;
};

// Orders Management
const ordersDbPath = path.join(process.cwd(), 'data', 'orders.json');

const ensureOrdersDb = () => {
    const dir = path.dirname(ordersDbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(ordersDbPath)) {
        fs.writeFileSync(ordersDbPath, JSON.stringify({ orders: [], lastId: 0 }, null, 2));
    }
};

export const getOrders = () => {
    ensureOrdersDb();
    const data = fs.readFileSync(ordersDbPath, 'utf8');
    return JSON.parse(data);
};

export const saveOrder = (order) => {
    ensureOrdersDb();
    const db = getOrders();

    const newId = (db.lastId + 1).toString();
    const newOrder = {
        ...order,
        id: newId,
        createdAt: new Date().toISOString(),
        status: order.status || 'pending'
    };

    db.orders.push(newOrder);
    db.lastId = parseInt(newId);

    fs.writeFileSync(ordersDbPath, JSON.stringify(db, null, 2));
    return newOrder;
};

export const updateOrder = (id, updates) => {
    ensureOrdersDb();
    const db = getOrders();
    const index = db.orders.findIndex(o => o.id === id);

    if (index === -1) return null;

    const updatedOrder = {
        ...db.orders[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    db.orders[index] = updatedOrder;
    fs.writeFileSync(ordersDbPath, JSON.stringify(db, null, 2));
    return updatedOrder;
};


