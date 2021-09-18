const productSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

export default Product