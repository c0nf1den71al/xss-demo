"use client"

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import data from '@/data.json' assert { type: 'json' };

export default function Home() {
  const router = useRouter()
  const params = useSearchParams()

  const [filtered, setFiltered] = useState([])
  const [searchText, setSearchText] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(searchText);
    }
  };

  const search = (query) => {
    setFiltered([])
    router.push(`https://xss.jamiepegg.com/?q=${query}`)
  }

  const createSessionToken = (len) => {
    let maxlen = 8
    let min = Math.pow(16,Math.min(len,maxlen)-1)
    let max = Math.pow(16,Math.min(len,maxlen)) - 1
    let n   = Math.floor( Math.random() * (max-min+1) ) + min
    let r   = n.toString(16)

    while ( r.length < len ) {
       r = r + createSessionToken( len - maxlen );
    }
    return r;
  };

  useEffect(() => {
    const session = localStorage.getItem('session')

    if (!session) {
      localStorage.setItem('session', createSessionToken(32))
    }

    if(params.get('q')) {
      let query = params.get('q')
      let results = []
      data.forEach((item) => {
        let inArray = false;

        Object.entries(item).forEach(([key, value]) => {
          if (value.toString().toLowerCase().includes(query.toLowerCase()) && !inArray) {
            inArray = true
            results.push(item)
          }
        })
        
        if (!inArray && `${item.firstname} ${item.lastname}`.toLowerCase().includes(query.toLowerCase())) {
          results.push(item)
          inArray = true
        }
      })

      setFiltered(results)
      setSearchText(query)
      setSubmittedQuery(query)
    }
  }, [params])

  return (
    <main className="p-24">
      <div className='flex flex-row items-center justify-between pb-12'>
        <div>
          <h1 className="text-3xl font-bold">The People Database</h1>
          <p className="text-slate-400">A public database of people who live in the United States.</p>
        </div>
        <div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input value={searchText} onChange={handleSearchChange} onKeyDown={handleKeyDown} type="text" placeholder="John Doe" />
            <Button onClick={() => search(searchText)}>Search</Button>
          </div>
        </div>
      </div>

      {submittedQuery && (<div className="flex flex-row gap-2 pb-12">Showing results for: <div dangerouslySetInnerHTML={{ __html: submittedQuery }}></div></div>) }

      <Table>
      <TableCaption>Showing {filtered.length} of {data.length} people</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((person) => (
          <TableRow key={person.firstname}>
            <TableCell className="font-medium">{person.firstname}</TableCell>
            <TableCell>{person.lastname}</TableCell>
            <TableCell>{person.location}</TableCell>
            <TableCell>{person.age}</TableCell>
            <TableCell>{person.gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </main>
  )
}
