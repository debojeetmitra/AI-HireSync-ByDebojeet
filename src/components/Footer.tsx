export default function Footer() {
    return (
        <footer className="py-6 border-t mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} Remote Interview App. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">Made with ❤️ by</span>
                        <span className="text-sm font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Debojeet Mitra
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
