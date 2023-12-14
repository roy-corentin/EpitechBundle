bits 64

section .text
global strchr

strchr:
    mov rax, rdi            ; get first argument
    mov bl, sil             ; get second argument
    jmp loop

increment:
    inc rax                 ; increment my string to the next character

loop:
    cmp byte[rax], 0        ; compare if first character is equal to NULL
    je error                ; jmp to return NULL
    cmp byte[rax], bl       ; compare if equal to the character target
    jne increment           ; otherwise increment
    ret                     ; return the new string

error:
    mov rax, 0
    ret