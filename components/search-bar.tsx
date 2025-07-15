import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchBar() {
   return (
      <div className="bg-emerald-500 py-8 px-4">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <Input placeholder="Search Keyword" className="bg-white h-12" />
               <Select>
                  <SelectTrigger className="bg-white h-12">
                     <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="apartment">Apartment</SelectItem>
                     <SelectItem value="house">House</SelectItem>
                     <SelectItem value="villa">Villa</SelectItem>
                     <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
               </Select>
               <Select>
                  <SelectTrigger className="bg-white h-12">
                     <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="new-york">New York</SelectItem>
                     <SelectItem value="london">London</SelectItem>
                     <SelectItem value="paris">Paris</SelectItem>
                     <SelectItem value="tokyo">Tokyo</SelectItem>
                  </SelectContent>
               </Select>
               <Button className="bg-white hover:bg-white text-black h-12">Search</Button>
            </div>
         </div>
      </div>
   )
}
