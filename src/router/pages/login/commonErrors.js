export function error500() {
    this.setGlobalMessage({
        message: "Erro interno do sistema. Possível manutenção.",
        type: 'error'
    })
}