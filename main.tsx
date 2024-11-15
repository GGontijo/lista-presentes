'use client'

import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const totalGifts = 24

interface Gift {
  id: number
  image: string
}

const gifts: Gift[] = Array.from({ length: totalGifts }, (_, i) => ({
  id: i + 1,
  image: `/images/${i + 1}.png`
}))

export default function GiftRegistry() {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const pixCode = '07401790122'

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
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#E6E2AF] text-[#333333] p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Lista de Presentes de Casamento</h1>
      </header>

      <main>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {gifts.map((gift) => (
            <Card key={gift.id} className="bg-[#F5F5DC] hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <img src={gift.image} alt={`Presente ${gift.id}`} className="w-full h-auto rounded-md mb-2" />
                <Button 
                  onClick={() => handleGiftSelect(gift)}
                  className="w-full bg-[#C2B280] hover:bg-[#A39480] text-white"
                >
                  Escolher
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={selectedGift !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#F5F5DC] text-[#333333]">
          <DialogHeader>
            <DialogTitle>Código Pix</DialogTitle>
          </DialogHeader>
          <img src="/assets/qr.jpg" alt="QR Code Pix" className="w-full max-w-[300px] mx-auto rounded-md mb-4" />
          <p>Clique no código abaixo para copiar:</p>
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={pixCode}
              readOnly
              className="flex-grow p-2 border rounded-l-md bg-white"
            />
            <Button
              onClick={copyToClipboard}
              className="rounded-l-none bg-[#C2B280] hover:bg-[#A39480]"
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}