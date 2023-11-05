import Stock from '../models/stock.js';

const stockController = {
    async createProduct(req, res) {
        try {
            const { name, category, price, quantity } = req.body;

            if (!name || !category || !price || !quantity) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
            }
            const product = await Stock.create({ name, category, price, quantity });
            return res.status(200).json(product);

        } catch (err) {
            console.error("Erro ao registrar um novo produto", err);
            return res.status(500).json({ error: "Erro ao registrar um novo produto" });
        }
    },
    async getAllProducts(req, res) {
        try {
            const products = await Stock.findAll();
            return res.status(200).json(products);
        } catch (err) {
            console.error("Erro ao retornar a lista de produtos", err);
            return res.status(500).json({ error: "Erro ao retornar a lista de produtos" });
        }
    },
    async getProductById(req, res) {
        const id = req.params.id;
        try {
            const product = await Stock.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: "Este produto não existe" });
            }
            return res.status(200).json(product);
        } catch (err) {
            console.error("Produto Não encontrado", err);
            return res.status(500).json({ error: 'Produto não encontrado' });
        }
    },
    async updateProduct(req, res) {
        const id = req.params.id;
        try {
            const { name, category, price, quantity } = req.body;
            const [updated] = await Stock.update(
                { name, category, price, quantity },
                { where: { id: id } }
            );
            if (updated) {
                const updatedProduct = await Stock.findByPk(id);
                return res.status(200).json(updatedProduct);
            }
            throw new Error('Produto não encontrado');
        } catch (err) {
            console.error("Erro ao atualizar o produto", err);
            return res.status(500).json({ error: "Erro ao atualizar o produto" });
        }
    },
    async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const deletedProduct = await Stock.destroy({
                where: { id: id }
            });
            if (deletedProduct) {
                return res.status(200).json({ message: "Produto excluído com sucesso" });
            }
            throw new Error('Produto não encontrado');
        } catch (err) {
            console.error("Erro ao excluir o produto", err);
            return res.status(500).json({ error: "Erro ao excluir o produto" });
        }
    }
};

export default stockController;
