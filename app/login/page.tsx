'use client'

import { createClient } from '@/utils/supabase/client'
import { Provider } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from "next/image";

export default function LoginPage(this: any) {
	const supabase = createClient()
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function login() {
		const { error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) {
			console.error(error)
		}
		router.push('/')
	}

	async function signup() {
		const { error } = await supabase.auth.signUp({ email, password })
		if (error) {
			console.error(error)
		}
		router.push('/')
	}

	async function google(provider: Provider) {
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				// redirectTo: `https://*-friend-28.vercel.app/**`,
				redirectTo: `${location.origin}/auth/callback`,
			
			}
		})
	
	}

	return (
		<div className="bg-gray-100 h-screen flex items-center justify-center">
			<div className="bg-white p-8 rounded shadow-lg w-80">
				<h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
				<form>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
						<input type="email"  onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"  />
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
						<input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"  />
					</div>
					<button formAction={login} type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3">Login</button>
					<button formAction={signup} type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3">Signup</button>

					{/* <button formAction={google.bind(this, 'google')} type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex justify-center items-center gap-2"><Image className='bg-white p-1 rounded-full' src='/icons/google-icon.svg' alt="google" width={20} height={20}/>Google Login</button> */}
				</form>
			</div>
		</div>

	)
}


/*

import { useRouter } from 'next/router'
import { useState } from 'react'

import { createClient } from '@/utils/supabase/component'

export default function LoginPage() {
	const router = useRouter()
	const supabase = createClient()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function logIn() {
		const { error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) {
			console.error(error)
		}
		router.push('/')
	}

	async function signUp() {
		const { error } = await supabase.auth.signUp({ email, password })
		if (error) {
			console.error(error)
		}
		router.push('/')
	}

	return (
		<main>
			<form>
				<label htmlFor="email">Email:</label>
				<input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor="password">Password:</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="button" onClick={logIn}>
					Log in
				</button>
				<button type="button" onClick={signUp}>
					Sign up
				</button>
			</form>
		</main>
	)
}

*/