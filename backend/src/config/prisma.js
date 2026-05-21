// src/config/prisma.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// BigInt serialization fix untuk JSON.stringify
BigInt.prototype.toJSON = function () {
  return this.toString();
};

module.exports = prisma;