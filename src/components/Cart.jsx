import { useState, useEffect } from 'react'
import CartItem from './CartItem'
import StockManager from './StockManager'


// import { plantList } from '../datas/plantList'
import '../styles/Cart.css'

function Cart({ cart, updateCart }) {

	//il faut décrémenter le stock
	//supprime un item
	function removeItem(id) {
		updateCart(prevCart => {
			const updatedCartUnfiltered = prevCart.map(item => {
				if (item.id !== id) {
					return item;
				}

				if (item.amount <= 1) {
					return null;
				}

				//si la quantité est plus que 1, décrémenter la quantité
				return { ...item, amount: item.amount - 1 }
			});

			const updatedCart = updatedCartUnfiltered.filter(item => item !== null);
			return updatedCart;
		})
	}
	//ouvre et ferme la panier
	const [isOpen, setIsOpen] = useState(true)

	//calcule le total du panier
	const total = cart.reduce(
		(acc, plantType) => acc + plantType.price * plantType.amount, 0
	)

	// useEffect - on veut que le titre de l'onglet change pour le montant total du panier
	useEffect(() => {
		document.title = `LMJ: ${total}€ d'achats`
	}, [total])


	return isOpen ? (
		<div className='lmj-cart'>
			<button
				className='lmj-cart-toggle-button'
				onClick={() => setIsOpen(false)}
			>
				Fermer
			</button>
			{/* si la longueur du panier plus grand que 0 on map chaque item et son ordre(item, index) */}
			{cart.length > 0 ? (
				<div>
					<h2>Panier</h2>

					<ul>
						{cart.map((item, index) => (
							<CartItem key={item.id} item={item} index={index} onRemove={() => removeItem(item.id)} />
						))}
					</ul>

					<h3>Total :{total}€</h3>
					<button onClick={() => updateCart([])}>Vider le panier</button>
				</div>
			) : (
				<div>Votre panier est vide</div>
			)}
		</div>
	) : (
		<div className='lmj-cart-closed'>
			<button
				className='lmj-cart-toggle-button'
				onClick={() => setIsOpen(true)}
			>
				Ouvrir le Panier
			</button>
		</div>
	)
}


export default Cart