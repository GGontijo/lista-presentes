"'use client'"

import { useState } from "'react'"
import { Copy, Check, Heart } from "'lucide-react'"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const totalGifts = 24

interface Gift {
  id: number
  image: string
  name: string
  price: number
}

const gifts: Gift[] = Array.from({ length: totalGifts }, (_, i) => ({
  id: i + 1,
  image: `/images/${i + 1}.png`,
  name: `Presente ${i + 1}`,
  price: Math.floor(Math.random() * (500 - 50 + 1) + 50)
}))

export function GiftRegistryComponent() {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const pixCode = "'07401790122'"

  const handleGiftSelect = (gift: Gift) => {
    setSelectedGift(gift)
  }

  const handleCloseModal = () => {
    setSelectedGift(null)
    setIsCopied(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("'Failed to copy: '", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 text-gray-800 p-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-script text-pink-800 mb-2">João & Maria</h1>
        <h2 className="text-3xl font-semibold mb-4">Lista de Presentes de Casamento</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sua presença é o maior presente, mas se desejar nos presentear, 
          ficaremos honrados com sua contribuição para o início de nossa vida a dois.
        </p>
      </header>

      <main className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <Card key={gift.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-4">
                <div className="relative pb-[100%] mb-4">
                  <img 
                    src={gift.image} 
                    alt={gift.name} 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{gift.name}</h3>
                <p className="text-gray-600 mb-4">R$ {gift.price.toFixed(2)}</p>
                <Button 
                  onClick={() => handleGiftSelect(gift)}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Presentear <Heart className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={selectedGift !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-white text-gray-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-script text-pink-800">Contribuir com o Presente</DialogTitle>
            <DialogDescription>
              {selectedGift && (
                <p className="text-gray-600">
                  Você escolheu contribuir com o presente: {selectedGift.name} (R$ {selectedGift.price.toFixed(2)})
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <img src="/assets/qr.jpg" alt="QR Code Pix" className="w-full max-w-[200px] mx-auto rounded-md mb-4" />
          <p className="text-center mb-2">Escaneie o QR Code ou use o código Pix abaixo:</p>
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={pixCode}
              readOnly
              className="flex-grow p-2 border border-neutral-200 rounded-l-md bg-gray-50 text-center dark:border-neutral-800"
            />
            <Button
              onClick={copyToClipboard}
              className="rounded-l-none bg-pink-500 hover:bg-pink-600 text-white"
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Agradecemos imensamente sua contribuição para nossa nova vida!
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}