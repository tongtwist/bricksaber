import { App } from "./App"

async function main () {
	const app = await App.create(document.body)
	app.run()
}
main()