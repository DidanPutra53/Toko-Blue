const mongoose = require('mongoose')
const produkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Harap Masukan Nama Produk'],
        trim: true,
        maxLength: [100, 'Nama Produk Tidak Melebihi 100 karakter']
    },
    price: {
        type: Number,
        required: [true, 'Harap Masukan Harga Produk'],
        maxLength: [10, 'Nama Produk Tidak Melebihi 10 karakter'],
        default: 0
    },
    desc: {
        type: String,
        required: [true, 'Harap Masukan deskripsi Produk'],
    },
    productimg: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Harap Masukan Kategori Produk'],
        enum: {
            values: [
                'Makanan',
                'Minuman',
                'Perlengkapan Rumah Tangga',
                'Kesehatan & Kecantikan',
                'Ibu & Anak',
            ],
            message: 'Pilih Kategori Yang ada'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Isi Stock Barang'],
        maxLength: [5, 'Nama Produk Tidak Melebihi 5 karakter'],
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: Date,

}, { timestamps: true })

module.exports = mongoose.model('Product', produkSchema);