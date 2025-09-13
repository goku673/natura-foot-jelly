

'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import { Button } from "@/components/ui/button"
import Link from 'next/link'
import img0 from '../../img/natura0.jpeg';
import img1 from '../../img/natura1.png';
import img2 from '../../img/natura2.png';
import img3 from '../../img/natura3.png';
import img4 from '../../img/natura4.jpeg';
import img5 from '../../img/natura5.jpg'; 
import img6 from '../../img/img6.jpg';
import img7 from '../../img/img7.jpg';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import imgLogo from '../../img/logonatura.jpg';


import Swal from 'sweetalert2';
export default function Home() {

  const [cartItems, setCartItems] = useState([]);
  const [animatingItem, setAnimatingItem] = useState(null);
  const [isCartShaking, setIsCartShaking] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [IsButtonSucking,setIsButtonSucking] = useState(false);
  const [animatedButtonIndex, setAnimatedButtonIndex] = useState(null);

useEffect(() => {
  if (cartItems.length > 0) {
    setIsCartShaking(true)
    const timer = setTimeout(() => setIsCartShaking(false), 500)
    return () => clearTimeout(timer)
  }
}, [cartItems]);

const addToCart = (productName, price,img) => {
  setCartItems(prev => {
    const existingItem = prev.find(item => item.name === productName)
    if (existingItem) {
      return prev.map(item => 
        item.name === productName 
          ? { ...item, quantity: item.quantity + 1, img : img }
          : item
      )
    } else {
      return [...prev, { name: productName, price, quantity: 1 ,img: img}]
    }
  })
  setAnimatingItem(productName)
  setTimeout(() => setAnimatingItem(null), 800)
}

const updateQuantity = (productName, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(productName)
  } else {
    setCartItems(prev => 
      prev.map(item => 
        item.name === productName 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }
}

const handleAddToCart = (product, index) => {
  addToCart(product.name, product.price, product.img);
  setAnimatedButtonIndex(index);
  setTimeout(() => {
    setAnimatedButtonIndex(null);
  }, 600);
};
  
  const removeFromCart = (productName) => {
    setCartItems(prev => prev.filter(item => item.name !== productName))
  }


  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="hidden md:flex items-center">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold sm:inline-block">Gelatinas de Pata</span>
              <Image alt='logo' src={imgLogo} className='w-10 h-10 rounded-full'/>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="#productos">Productos</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="#beneficios">Beneficios</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="#receta">Receta</a>
            </nav>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`relative ${isCartShaking ? 'animate-shake' : ''}`}
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Descubre el Sabor de nuestras Gelatinas de Pata
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Deliciosas gelatinas artesanales con sabores únicos y texturas irresistibles.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a className="px-4 py-2 text-white bg-gray-900 rounded hover:bg-gray-700 transition-colors" href='#productos'>Ver Productos</a>
                  <button onClick={() => setIsContactModalOpen(true)} className="px-4 py-2 text-gray-900 border border-gray-900 rounded hover:bg-blue-50 transition-colors">Contactar</button>
                </div>
              </div>
              <Image
                alt="Gelatinas Pata"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src={img0}
                width="750"
              />
            </div>
          </div>
        </section>

        <section id="productos" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-slate-200 sm:text-5xl text-center mb-12">Nuestros Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Gelatina de pata normal", price: "$2.50", img : img0},
                { name: "Gelatina de pata chocolate", price: "$2.50", img : img6 },
                { name: "Gelatina de pata ultimate", price: "$2.50", img : img7 },
                { name: "Gelatina de pata la tradicional", price: "$2.75", img : img3 },
                { name: "Combo gelatina de pata", price: "$3.00", img : img4 },
                { name: "Gomitas de gelatina de pata", price: "$3.25", img : img5 },
              ].map((product, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative">
                    <Image
                      alt={product.name}
                      className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                      height="200"
                      src={product.img}
                      width="200"
                    />
                    
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{product.name}</h3>
                  <p className="mt-2 text-gray-500">{product.price}</p>
                  <button 
                  className={`mt-4 px-4 py-2 text-white border border-white rounded hover:bg-gray-50 hover:text-gray-900 transition-colors ${animatedButtonIndex === index ? "animate-suck-up" : ""}`}
                  onClick={() => handleAddToCart(product, index)} // Llama a la función con el índice
                >
                    Añadir al Carrito
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="receta" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-300">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Receta Tradicional (GENERAL)</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Elaboración de la gelatina de pata</h3>
                <p className="mb-4">La elaboración de la gelatina de pata es un arte culinario que ha pasado de generación en generación. Se destaca por su cuidadoso proceso artesanal y por la meticulosa extracción de colágeno de las patas de la res, que es la base fundamental de este postre tradicional.</p>
                <h4 className="text-xl font-semibold mb-2">Ingredientes clave</h4>
                <ul className="list-disc pl-5 mb-4">
                  <li>Patas de res</li>
                  <li>Panela</li>
                  <li>Canela</li>
                  <li>Clavos de olor</li>
                  <li>Esencia de vainilla</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Paso a paso de la preparación</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Limpieza de las patas de res:</strong> Lavar bien las patas con agua corriente y frotar con sal para eliminar impurezas.</li>
                  <li><strong>Cocción inicial:</strong> Colocar las patas en una olla grande, cubrir con agua fría, añadir especias y cocinar a fuego lento durante varias horas.</li>
                  <li><strong>Enfriamiento y extracción del colágeno:</strong> Retirar las patas del caldo, enfriar ligeramente y separar la carne, el colágeno y la gelatina.</li>
                  <li><strong>Solidificación y enfriamiento:</strong> Mezclar el colágeno y la gelatina con el caldo, verter en moldes y refrigerar hasta que solidifique.</li>
                  <li><strong>Servir y disfrutar:</strong> Cortar en porciones y servir fría.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section id="beneficios" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">¿Por qué elegir Gelatinas Pata?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "100% Naturales", description: "Elaboradas con ingredientes frescos y naturales." },
                { title: "Sabores Únicos", description: "Combinaciones de sabores que no encontrarás en otro lugar." },
                { title: "Bajas en Calorías", description: "Un postre delicioso y ligero para cualquier ocasión." },
                { title: "Entrega a Domicilio", description: "Llevamos nuestras gelatinas directamente a tu puerta." },
                { title: "Personalizables", description: "Creamos diseños especiales para tus eventos." },
                { title: "Producción Artesanal", description: "Cada gelatina es hecha con amor y cuidado." },
              ].map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-gray-900 p-2 text-white">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-gray-500">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Gelatinas de Pata Natura. Todos los derechos reservados al desarrollador Freddy Amin Zapata Morato.</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">© UNIVERSIDAD MAYOR DE SAN SÍMON, ASIGNATURA : MERCADOTECNIA</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">© DOCENTE: SARMIENTO FRANCO ARIEL ANTONIO</p>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tu Carrito</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar carrito"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Tu carrito está vacío.</p>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="ml-4 text-red-500 hover:text-red-700"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font</continuation_point>-bold text-xl">${totalPrice.toFixed(2)}</span>
                  </div>
                  <button onClick={() => {
                    Swal.fire({
                      title: "¿Estas seguro que quieres continuar con la compra?",
                      showDenyButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Comprar",
                      denyButtonText: `No comprar`
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire("Felicidades por comprar nuestro producto en Natura", "simulación de una compra", "success");
                        setCartItems([]);
                      } else if (result.isDenied) {
                        Swal.fire("La compra de productos a sido cancelada!", "", "info");
                      }
                    });
                  } } className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors text-lg font-semibold">
                    Proceder al Pago
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

{isContactModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Contáctanos</h2>
        <button 
          onClick={() => setIsContactModalOpen(false)}
          className="text-gray-400 hover:text-gray-200"
          aria-label="Cerrar formulario de contacto"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={(e) => {
         e.preventDefault();
         Swal.fire({
           title: "Gracias por contactarte",
           text: "Te responderemos en breve",
           icon: "success",
         })
         }}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
            placeholder="Ingresa tu nombre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Mensaje</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4} 
            required 
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
            placeholder="Escribe tu mensaje aquí"
          ></textarea>
        </div>
            <button 
              type="submit" 
              className="w-full border border-white text-white py-2 px-4 rounded-md hover:bg-white hover:text-gray-900 transition-colors"
            >
              Enviar Mensaje jgasgasdgg
            </button>
      </form>
    </div>
  </div>
)}
    </div>
  )
}