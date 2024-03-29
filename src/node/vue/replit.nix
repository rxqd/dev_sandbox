{ pkgs }: {
	deps = [
    pkgs.corepack_20
    pkgs.nodejs_20
    pkgs.nodePackages.typescript-language-server
    
	];
}