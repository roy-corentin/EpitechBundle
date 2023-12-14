bits 64

section .text
global memcpy

memcpy:
    mov rax, rdi                            ; get first argument void * to modify
    xor rbx, rbx                            ; initialise rbx to zero
    jmp loop

increment:
    inc rbx

loop:
    cmp rbx, rdx                            ; compare my counter to the size gave in parameter (third parameter)
    jge end                                 ; if equal or greater, then function has to end
    cmp byte[rsi + rbx], 0                  ; compare is current src modification is equal to '\0'
    je end 
    mov cl, byte[rsi + rbx]
    mov byte[rax + rbx], cl                 ; change the current dest modification into the src 
    jmp increment                           ; jmp to increment to increment and loop 

end:
    ret