setup-emul:
	firebase emulators:start --import=default_data --export-on-exit=base_data

emul: build-fns
	firebase emulators:start --import=base_data --export-on-exit

run-client:
	cd client; npm start

build-fns:
	cd functions; npm run build