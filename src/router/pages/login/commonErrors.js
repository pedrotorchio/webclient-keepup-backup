export function error500() {
    this.setGlobalMessage({
        message: "Erro interno do sistema. Possível manutenção.",
        type: 'error'
    })
}
export function error400() {
    this.setGlobalMessage({
        message: "Erro em um dos campos",
        type: 'error'
    })
}