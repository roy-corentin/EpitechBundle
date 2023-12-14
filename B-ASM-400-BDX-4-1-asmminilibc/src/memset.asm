bits 64
global memset
section .text

memset:
    mov rcx, 0                      ; initialse increment to zero
    jmp check

loop:
    mov byte [rdi + rcx], sil       ; move current modification to second argument
    inc rcx                         ; icrement

check:
    cmp rdx, rcx                    ; if (i < n) // rdx = size // rcx = emplacement actuel
    jg loop                         ; branchement à l’adresse si op1 > op2
    mov rax, rdi                    ; return (ptr)
    ret