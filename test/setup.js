process.env.TZ = 'UCT';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'thisIsMyJWTSecret';
process.env.JWT_EXPIRY = '3m';

require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');

process.env.TEST_DB_URL || 'postgresql://postgres@localhost/photoGramTest';
global.expect = expect;
global.supertest = supertest;
