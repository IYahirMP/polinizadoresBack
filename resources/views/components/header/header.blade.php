<header class="@container">
    <!-- Main navigation container -->
    <nav
        class="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
            <!-- Hamburger button for mobile view -->
            <x-header.hamburguer-button/>
            <!-- Collapsible navigation container -->
            <div
                class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                id="navbarSupportedContent1"
                data-twe-collapse-item>
                <!-- Logo -->
                <a
                    class="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                    href="#">
                    <img
                        src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                        style="height: 15px"
                        alt="TE Logo"
                        loading="lazy"/>
                </a>
                <!-- Left navigation links -->
                <ul
                    class="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
                    data-twe-navbar-nav-ref>
                    {{$navigation}}
                </ul>
                <!-- Left links -->
            </div>

            <!-- Right elements -->
            <div class="relative flex items-center">
                <!-- Second dropdown container -->
                {{$rightButton}}
            </div>
            <!-- Right elements -->
        </div>
    </nav>
</header>
