<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
    <style>

    </style>

</head>
<body>
<x-header>
    <x-slot:navigation>
        <x-header.nav-item>
            <x-slot:link>#</x-slot:link>
            <x-slot:name>Visualizacion</x-slot:name>
        </x-header.nav-item>
        <x-header.dropdown-menu>
            <x-slot:header>Operaciones</x-slot:header>
            <x-slot:content>
                Observaciones
                <span class="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                  </svg>
                </span>
            </x-slot:content>
            <x-slot:options>
                <x-header.dropdown-menu-option>
                    <x-slot:link></x-slot:link>
                    <x-slot:name>&iacute;ndice</x-slot:name>
                </x-header.dropdown-menu-option>
                <x-header.dropdown-menu-option>
                    <x-slot:link>#</x-slot:link>
                    <x-slot:name>Buscar</x-slot:name>
                </x-header.dropdown-menu-option>
                <x-header.dropdown-menu-option>
                    <x-slot:link>#</x-slot:link>
                    <x-slot:name>Crear</x-slot:name>
                </x-header.dropdown-menu-option>
            </x-slot:options>
        </x-header.dropdown-menu>
        <x-header.dropdown-menu>
            <x-slot:header>Operaciones</x-slot:header>
            <x-slot:content>
                Especies
                <span class="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                  </svg>
                </span>
            </x-slot:content>
            <x-slot:options>
                <x-header.dropdown-menu-option>
                    <x-slot:link>#</x-slot:link>
                    <x-slot:name>&iacute;ndice</x-slot:name>
                </x-header.dropdown-menu-option>
                <x-header.dropdown-menu-option>
                    <x-slot:link>admin/species/indice</x-slot:link>
                    <x-slot:name>Buscar</x-slot:name>
                </x-header.dropdown-menu-option>
                <x-header.dropdown-menu-option>
                    <x-slot:link>#</x-slot:link>
                    <x-slot:name>Crear</x-slot:name>
                </x-header.dropdown-menu-option>
            </x-slot:options>
        </x-header.dropdown-menu>
    </x-slot:navigation>
    <x-slot:rightButton>
        <div
            class="relative"
            data-twe-dropdown-ref
            data-twe-dropdown-alignment="end">
            <!-- Second dropdown trigger -->
            <a
                class="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-twe-dropdown-toggle-ref
                aria-expanded="false">
                <!-- User avatar -->
                <img
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                    class="rounded-full"
                    style="height: 25px; width: 25px"
                    alt=""
                    loading="lazy"/>
            </a>
            <!-- Second dropdown menu -->
            <ul
                class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="dropdownMenuButton2"
                data-twe-dropdown-menu-ref>
                <!-- Second dropdown menu items -->
                <li>
                    <a
                        class="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                    >Action</a
                    >
                </li>
                <li>
                    <a
                        class="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                    >Another action</a
                    >
                </li>
                <li>
                    <a
                        class="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        href="#"
                        data-twe-dropdown-item-ref
                    >Something else here</a
                    >
                </li>
            </ul>
        </div>
    </x-slot:rightButton>
</x-header>
<main>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                @yield('sidebar')
            </div>
            <div class="col-md-9">
                @yield('content')
            </div>
        </div>
    </div>
</main>

<footer>
</footer>

</body>
</html>
