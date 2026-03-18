return {
	{
		"neovim/nvim-lspconfig",
		opts = {
			servers = {
				tsserver = {
					init_options = {
						hostInfo = "neovim",
						preferences = {
							importModuleSpecifierPreference = "non-relative",
							importModuleSpecifierEnding = "minimal",
						},
					},
				},
			},
		},
	},
}
